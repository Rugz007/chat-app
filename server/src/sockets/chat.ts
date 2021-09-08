export const connectUser = (io : any) => {
  io.on("connection", (socket: any) => {
    console.log("Client Connected");
    socket.on("send message", (body: string) => {
      io.emit("message", body);
      console.log(body);
    });
  });
};

