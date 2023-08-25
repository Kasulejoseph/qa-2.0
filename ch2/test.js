const request = require("supertest");
const expect = require("chai").expect; // Using Expect style
require("dotenv").config();
const BASEURL = process.env.BASE_URL;

describe("Bookings", function () {
  let bookingId;
  let responseData;
  const bookingDetails = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  before(async function () {
    responseData = await request(BASEURL)
      .post(`booking`)
      .set("Accept", "application/json")
      .send(bookingDetails);

    bookingId = responseData.body.bookingid;
  });

  after(async function () {
    const deleteResponse = await request(BASEURL)
      .delete(`booking/${bookingId}`)
      .set("Accept", "application/json")
      .set("Authorization", "Basic YWRtaW46cGFzc3dvcmQxMjM=");
    expect(deleteResponse.status).to.equal(201);
  });

  it("POST / booking - create a booking", async function () {
    expect(responseData.status).to.equal(200);
    const { booking } = responseData.body;
    expect(booking.firstname).to.equal(bookingDetails.firstname);
    expect(booking.additionalneeds).to.equal(bookingDetails.additionalneeds);
  });

  it("GET / booking/:id - get a booking", async function () {
    const response = await request(BASEURL)
      .get(`booking/${bookingId}`)
      .set("Accept", "application/json");
    expect(response.status).to.equal(200);
    expect(response.body.firstname).to.equal("Jim");
    expect(response.body.additionalneeds).to.equal("Breakfast");
  });

  it("GET / booking/:id - reponds with 404 when booking does not exist", async function () {
    const fakeBookingId = "fake123";
    const response = await request(BASEURL)
      .get(`booking/${fakeBookingId}`)
      .set("Accept", "application/json");
    expect(response.status).to.equal(404);
  });

  it("UPDATE / booking/:id - update booking", async function () {
    const updateData = {
      additionalneeds: "Lunch",
      bookingdates: {
        checkin: "2023-01-01",
        checkout: "2023-12-12",
      },
    };
    const response = await request(BASEURL)
      .patch(`booking/${bookingId}`)
      .set("Accept", "application/json")
      .set("Authorization", "Basic YWRtaW46cGFzc3dvcmQxMjM=")
      .send(updateData);

    expect(response.status).to.equal(200);
    const { firstname, additionalneeds, bookingdates } = response.body;
    expect(firstname).to.equal(bookingDetails.firstname);
    expect(additionalneeds).to.equal(updateData.additionalneeds);
    expect(bookingdates.checkout).to.equal(updateData.bookingdates.checkout);
  });

  it("UPDATE / booking/:id - responds with a 403 when not authorised ", async function () {
    const updateData = {
      additionalneeds: "Lunch",
      bookingdates: {
        checkin: "2023-01-01",
        checkout: "2023-12-12",
      },
    };
    const response = await request(BASEURL)
      .patch(`booking/${bookingId}`)
      .set("Accept", "application/json")
      .send(updateData);

    expect(response.status).to.equal(403);
  });
});
