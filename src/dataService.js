// Dashboard cards data
export function getDashboardCards() {
  return [
    { title: 'Bank Accounts', value: '₹2,30,000', change: '+6.28%', positive: true },
    { title: 'Mutual Funds', value: '₹6,00,000', change: '+12.28%', positive: true },
    { title: 'Stocks', value: '₹4,30,000', change: '-2.89%', positive: false },
    { title: 'US Stocks', value: '$11,000', change: '+10.29%', positive: true },
  ];
}

// Dashboard charts data (mock)
export function getDashboardBarData() {
  return [40, 60, 80, 30, 50, 70, 90];
}
export function getDashboardLineData() {
  return [20, 50, 30, 70, 60, 80, 40];
}

// My Tasks data
export function getTasks() {
  return [
    {
      icon: '💲',
      name: 'MSFT - US stocks',
      date: 'Feb 2026',
      amount: '$1000',
      status: 'Invest',
    },
    {
      icon: '🥇',
      name: 'Step-up Mutual Fund',
      date: 'June 2026',
      amount: '15%',
      status: 'Invest',
    },
    {
      icon: '🏅',
      name: 'Gold ETF',
      date: 'Aug 2026',
      amount: '$30.09',
      status: 'Invest',
    },
  ];
}

// Chat messages data
export function getChatMessages() {
  return [
    { from: 'bot', name: 'LakshmAI', text: 'How may I help you?', time: '2 hours ago' },
    { from: 'user', name: 'You', text: 'I want to save up more for getting married in 2028 and increase my net worth by 20%.', time: '1 hour ago' },
    { from: 'bot', name: 'LakshmAI', text: `"Here’s how your current plan supports your goals of saving for your 2028 wedding and growing your net worth by 20% annually over the next 3 years:\n\n1. US Stocks (MSFT – Feb 2026):\n   Targets high growth through global tech exposure, boosting long-term net worth.\n2. Step-up Mutual Fund (June 2026):\n   Increases your investment steadily for compounding returns, building a dedicated wedding fund.\n3. Gold ETF (Aug 2026):\n   Adds stability and liquidity to your portfolio, serving as a backup for unexpected wedding costs."`, time: '1 hour ago' },
    { from: 'user', name: 'You', text: 'How much can I withdraw from my MF for wedding ideally?', time: null },
  ];
} 