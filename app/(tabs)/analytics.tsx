import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../../styles';
import { useItemManager } from '../../hooks/useItemManager';
import { useRecurringPaymentManager } from '../../hooks/useRecurringPaymentManager';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';

type PieChartData = {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};

export default function AnalyticsScreen() {
  const backgroundColor = useThemeColor({}, 'background'); // Get theme-based background color
  const { groupedItems } = useItemManager();
  const { monthlyPayments } = useRecurringPaymentManager();
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);

  useEffect(() => {
    // Prepare data for the pie chart
    const categoryTotals: Record<string, number> = {};

    // Aggregate data from groupedItems
    Object.values(groupedItems).flat().forEach((item) => {
      const tag = item.tag || 'Uncategorized';
      categoryTotals[tag] = (categoryTotals[tag] || 0) + item.price;
    });

    // Aggregate data from monthlyPayments
    monthlyPayments.forEach((payment) => {
      const tag = payment.name || 'Recurring';
      categoryTotals[tag] = (categoryTotals[tag] || 0) + payment.price;
    });

    // Format data for PieChart
    const formattedData = Object.entries(categoryTotals).map(([key, value], index) => ({
      name: key,
      amount: value,
      color: getRandomColor(index),
      legendFontColor: '#000000', // Default to black or any desired color
      legendFontSize: 14,
    }));

    // Only update state if the data has changed
    setPieChartData((prev) => (JSON.stringify(prev) !== JSON.stringify(formattedData) ? formattedData : prev));
  }, [groupedItems, monthlyPayments]); // Ensure groupedItems and monthlyPayments are the only dependencies

  const getRandomColor = (index: number) => {
    const colors = ['#FACC15', '#34D399', '#60A5FA', '#FBBF24', '#A78BFA', '#F87171']; // Yellow, green, and other colors
    return colors[index % colors.length];
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ScrollView>
        <ThemedText type="title" style={styles.header}>
          Spending Insights
        </ThemedText>

        {pieChartData.length > 0 ? (
          <>
            <ThemedText type="subtitle" style={styles.sectionHeader}>
              Spending Breakdown
            </ThemedText>
            <PieChart
              data={pieChartData}
              width={Dimensions.get('window').width - 40} // Full width minus padding
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Default to black with dynamic opacity
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </>
        ) : (
          <ThemedText style={{ color: '#FFFFFF', textAlign: 'center', marginTop: 20 }}>
            No data available for spending insights.
          </ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
}
