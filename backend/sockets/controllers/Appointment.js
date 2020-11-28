const ChatUtils = require("../../utils/ChatUtills");
const DynamicChat = require("../../models/DynamicChat");

module.exports = function (socket, ClientId) {
  socket.on("start_appointment", function (data) {
    console.log("start Appointment");
    const { PatientId } = data;
    //Verify if Client Id is of Therapist
    //Upon Recieving Appointment Date and Time. Verify that it is compatible by both users calender
    //If it is good, emit event to Patient of approve_appointment
    socket.in(PatientId.toString()).emit("approve_appointment");
  });

  socket.on("appointment_approved", function (data) {
    console.log("Appointment Approved");
    const room = ChatUtils.room;
    const therapist = data.therapist ? data.therapist : 0;
    //Verify if Client Id is of Patient and Appointment to be approved is of same Patient
    //Add appointment to database
    //emit event to both Clients of appointment has been approved so they can make http calls and update appointments
    socket.in(room(ClientId, therapist)).emit("appointment_approved");
  });
};
