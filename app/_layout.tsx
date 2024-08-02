import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"
          options={{
          title: 'Grocery bag (girl)',
          headerStyle: { backgroundColor: '#dffc35' },
          headerTintColor: '#085959',
          headerTitleStyle: {
              fontWeight: 'bold',
          }
      }} />
    </Stack>
  );
}
