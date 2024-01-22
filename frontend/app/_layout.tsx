import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "navy",
        },
        headerTintColor: "rgb(60, 200, 0)",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default Layout;
