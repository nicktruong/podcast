export const requestPermission = () => {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    console.log({ permission });
  });
};
