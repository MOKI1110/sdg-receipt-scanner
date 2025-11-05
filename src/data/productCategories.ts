export const productCategories = [
    {
      name: 'Dairy',
      description: 'Milk, cheese, yogurt, and other dairy products',
      icon: '🥛',
      avgCarbon: 3.5,
    },
    {
      name: 'Meat',
      description: 'Beef, pork, chicken, and other meat products',
      icon: '🥩',
      avgCarbon: 15.2,
    },
    {
      name: 'Grains',
      description: 'Rice, wheat, bread, and cereals',
      icon: '🌾',
      avgCarbon: 2.1,
    },
    {
      name: 'Vegetables',
      description: 'Fresh vegetables and produce',
      icon: '🥬',
      avgCarbon: 0.6,
    },
    {
      name: 'Fruits',
      description: 'Fresh and seasonal fruits',
      icon: '🍎',
      avgCarbon: 0.8,
    },
    {
      name: 'Beverages',
      description: 'Coffee, tea, juices, and soft drinks',
      icon: '☕',
      avgCarbon: 4.5,
    },
    {
      name: 'Snacks',
      description: 'Chips, biscuits, and packaged snacks',
      icon: '🍪',
      avgCarbon: 3.2,
    },
    {
      name: 'Personal Care',
      description: 'Shampoo, soap, and hygiene products',
      icon: '🧴',
      avgCarbon: 1.5,
    },
  ];
  
  export const getCategoryIcon = (category: string): string => {
    const cat = productCategories.find(c => c.name === category);
    return cat?.icon || '📦';
  };
  