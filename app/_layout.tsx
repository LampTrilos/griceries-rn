import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"
          options={{
          title: 'Grocery bag (girl)',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          }
      }} />
    </Stack>
  );
}
