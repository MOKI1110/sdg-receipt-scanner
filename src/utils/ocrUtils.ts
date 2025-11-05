// Using NVIDIA Nemotron Vision via OpenRouter for superior OCR accuracy

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// Helper to convert image file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const extractTextFromImage = async (image: File): Promise<string> => {
  try {
    console.log('🚀 Using NVIDIA Nemotron Vision for OCR...');
    
    // Convert image to base64
    const base64Image = await fileToBase64(image);
    
    // Call OpenRouter API with Nemotron Vision model
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'SDG Receipt Scanner',
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-nano-12b-v2-vl:free',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `You are an expert receipt OCR system. Extract ALL products from this shopping receipt.

CRITICAL RULES:
1. Preserve decimal points EXACTLY (1.2 NOT 12, 1.5 NOT 15, 0.5 NOT 5)
2. Extract quantities from the "Quantity" column only (not prices or totals)
3. Include product name, quantity, and unit for each item
4. Use standard units: kg, L, g, ml, pcs, dozen

Return ONLY a valid JSON array with NO markdown, NO explanation, NO code blocks:
[
  {"name": "Milk", "quantity": 2, "unit": "L"},
  {"name": "Chicken", "quantity": 1.2, "unit": "kg"},
  {"name": "Eggs", "quantity": 12, "unit": "pcs"}
]

Extract ALL products from the receipt now.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
        temperature: 0.1, // Low temperature for accuracy
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API Error:', errorData);
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const textContent = data.choices[0]?.message?.content;
    
    if (!textContent) {
      throw new Error('No content returned from Vision API');
    }

    console.log('📝 Raw Vision API Response:', textContent);

    // Clean any markdown code blocks if present
    let jsonStr = textContent.trim();
    jsonStr = jsonStr.replace(/``````\n?/g, '').trim();
    
    // Parse JSON response
    const extractedData = JSON.parse(jsonStr) as Array<{
      name: string;
      quantity: number;
      unit: string;
    }>;

    console.log('✅ Extracted Products:', extractedData);

    // Convert to text format compatible with existing matcher
    const productLines = extractedData.map(item => 
      `${item.name} ${item.quantity} ${item.unit}`
    );

    return productLines.join('\n');

  } catch (error) {
    console.error('❌ Vision OCR Error:', error);
    
    // Provide helpful error messages
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse receipt data. Please try with a clearer image.');
    }
    
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.');
    }
    
    throw new Error('Failed to extract text from receipt. Please try again with a clearer image.');
  }
};

export const parseReceiptText = (text: string): string[] => {
  // Vision API already provides clean product lines
  // Just split and filter empty lines
  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  console.log('📋 Parsed Receipt Lines:', lines);
  
  return lines;
};
