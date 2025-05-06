import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
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
  const rawTextColor = useThemeColor({}, 'text'); // Get theme-based text color
  const textColor = typeof rawTextColor === 'string' ? rawTextColor : '#000'; // Fallback to black
  const { groupedItems } = useItemManager();
  const { monthlyPayments } = useRecurringPaymentManager();
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);

  useEffect(() => {
    const categoryTotals: Record<string, number> = {};

    Object.values(groupedItems).flat().forEach((item) => {
      const tag = item.tag || 'Uncategorized';
      categoryTotals[tag] = (categoryTotals[tag] || 0) + item.price;
    });

    monthlyPayments.forEach((payment) => {
      const tag = payment.name || 'Recurring';
      categoryTotals[tag] = (categoryTotals[tag] || 0) + payment.price;
    });

    const formattedData = Object.entries(categoryTotals).map(([key, value], index) => ({
      name: key,
      amount: value,
      color: getRandomColor(index),
      legendFontColor: textColor,
      legendFontSize: 14,
    }));

    setPieChartData((prev) =>
      JSON.stringify(prev) !== JSON.stringify(formattedData) ? formattedData : prev
    );
  }, [groupedItems, monthlyPayments, textColor]);

  const getRandomColor = (index: number) => {
    const colors = ['#FACC15', '#34D399', '#60A5FA', '#FBBF24', '#A78BFA', '#F87171'];
    return colors[index % colors.length];
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ScrollView>
        <ThemedText type="title" style={[styles.header, { color: textColor }]}>
          Spending Insights
        </ThemedText>

        {pieChartData.length > 0 ? (
          <>
            <ThemedText type="subtitle" style={[styles.sectionHeader, { color: textColor }]}>
              Spending Breakdown
            </ThemedText>
            <PieChart
              data={pieChartData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </>
        ) : (
          <ThemedText style={{ color: textColor, textAlign: 'center', marginTop: 20 }}>
            No data available for spending insights.
          </ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
}
