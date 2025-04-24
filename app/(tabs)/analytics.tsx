import React, { useEffect, useState } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../../styles';
import { useItemManager } from '../../hooks/useItemManager';
import { ThemedText } from '@/components/ThemedText';

type CategoryData = {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};

type MonthlySpendingData = {
  month: string;
  total: number;
};

export default function AnalyticsScreen() {
  const { groupedItems } = useItemManager();
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [monthlySpending, setMonthlySpending] = useState<MonthlySpendingData[]>([]);

  useEffect(() => {
    // Prepare data for category breakdown
    const categoryTotals: Record<string, number> = {};
    Object.values(groupedItems).flat().forEach((item) => {
      const tag = item.tag || 'Uncategorized';
      categoryTotals[tag] = (categoryTotals[tag] || 0) + (item.price || 0); // Ensure item.price is valid
    });
    const formattedCategoryData = Object.entries(categoryTotals).map(([key, value]) => ({
      name: key,
      amount: value || 0, // Ensure value is valid
      color: getRandomColor(),
      legendFontColor: '#FFFFFF',
      legendFontSize: 14,
    }));
    setCategoryData(formattedCategoryData);

    // Prepare data for monthly spending trends
    const monthlyTotals: Record<string, number> = {};
    Object.entries(groupedItems).forEach(([date, items]) => {
      const month = date.slice(0, 7); // Extract YYYY-MM
      monthlyTotals[month] = (monthlyTotals[month] || 0) + items.reduce((sum, item) => sum + (item.price || 0), 0); // Ensure item.price is valid
    });
    const formattedMonthlySpending = Object.entries(monthlyTotals).map(([month, total]) => ({
      month,
      total: total || 0, // Ensure total is valid
    }));
    setMonthlySpending(formattedMonthlySpending);
  }, [groupedItems]); // Ensure groupedItems is the only dependency

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <LinearGradient colors={['#8B5CF6', '#5B21B6']} style={styles.container}>
      <ScrollView>
        <ThemedText type="title" style={styles.header}>
          Spending Analytics
        </ThemedText>

        {/* Monthly Spending Trends */}
        {monthlySpending.length > 0 ? (
          <>
            <ThemedText type="subtitle" style={styles.sectionHeader}>
              Monthly Spending Trends
            </ThemedText>
            <LineChart
              data={{
                labels: monthlySpending.map((data) => data.month),
                datasets: [
                  {
                    data: monthlySpending.map((data) => data.total || 0), // Ensure data is valid
                  },
                ],
              }}
              width={Dimensions.get('window').width - 40} // Full width minus padding
              height={220}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#5B21B6',
                backgroundGradientFrom: '#8B5CF6',
                backgroundGradientTo: '#5B21B6',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </>
        ) : (
          <ThemedText style={{ color: '#FFFFFF', textAlign: 'center', marginTop: 20 }}>
            No data available for monthly spending trends.
          </ThemedText>
        )}

        {/* Category Breakdown */}
        {categoryData.length > 0 ? (
          <>
            <ThemedText type="subtitle" style={styles.sectionHeader}>
              Category Breakdown
            </ThemedText>
            <PieChart
              data={categoryData}
              width={Dimensions.get('window').width - 40} // Full width minus padding
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </>
        ) : (
          <ThemedText style={{ color: '#FFFFFF', textAlign: 'center', marginTop: 20 }}>
            No data available for category breakdown.
          </ThemedText>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
