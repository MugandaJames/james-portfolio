import type { StaticImageData } from "next/image";
import signIn from "@/assets/shots/identity/sign-in.webp";
import register from "@/assets/shots/identity/register.webp";
import handoff from "@/assets/shots/identity/tickets-handoff.webp";
import home from "@/assets/shots/tickets/home-mobile.webp";
import discover from "@/assets/shots/tickets/discover-mobile.webp";
import reserve from "@/assets/shots/tickets/reserve-mobile.webp";
import confirmed from "@/assets/shots/tickets/booking-confirmed-mobile.webp";
import ticket from "@/assets/shots/tickets/qr-ticket-mobile.webp";
import gate from "@/assets/shots/tickets/check-in-mobile.webp";
import discoverDesktop from "@/assets/shots/tickets/discover-desktop.webp";
import studio from "@/assets/shots/tickets/studio-desktop.webp";

/** Background of the WAONA Tickets app, so short phone screenshots blend into the frame. */
export const APP_BG = "#0a1020";

export type Shot = {
  src: StaticImageData;
  alt: string;
  bg?: string;
};

export const shots = {
  identity: {
    signIn: { src: signIn, alt: "WAONA Identity sign-in page with username and password fields" },
    register: { src: register, alt: "WAONA Identity registration form" },
    handoff: {
      src: handoff,
      alt: "WAONA Tickets prompting the user to create an account through WAONA's secure sign-in page",
    },
  },
  tickets: {
    home: { src: home, alt: "WAONA Tickets home: Life is better when you show up, with event search" },
    discover: { src: discover, alt: "Event search with a featured event counting down to its start" },
    reserve: { src: reserve, alt: "Choosing an Early Bird ticket and reserving it to pay with M-Pesa" },
    confirmed: { src: confirmed, alt: "Booking confirmed notification" },
    ticket: { src: ticket, alt: "Early Bird QR ticket for Nairobi Creators Summit", bg: "#030509" },
    gate: { src: gate, alt: "Gate check-in screen with a Start scanning button" },
    discoverDesktop: {
      src: discoverDesktop,
      alt: "WAONA Tickets on desktop showing the Nairobi Tech & Innovation Meetup 2026",
    },
    studio: {
      src: studio,
      alt: "Studio, where organizers manage events, bookings, earnings and team",
    },
  },
} satisfies Record<string, Record<string, Shot>>;

/** The ticket-buying journey, in order. Used by the home page walkthrough. */
export const ticketJourney: { title: string; body: string; shot: Shot }[] = [
  {
    title: "Find something to do",
    body: "Search by artist, county and date. Featured events count down to the moment doors open.",
    shot: shots.tickets.discover,
  },
  {
    title: "Reserve and pay with M-Pesa",
    body: "Pick a ticket and reserve it. The seat is held while you pay, so it can never be sold twice.",
    shot: shots.tickets.reserve,
  },
  {
    title: "Get a confirmed booking",
    body: "A booking is confirmed only once M-Pesa confirms the payment. A repeated callback changes nothing.",
    shot: shots.tickets.confirmed,
  },
  {
    title: "Carry the ticket on your phone",
    body: "Every ticket is a QR code that scans once, and it can be transferred to a friend.",
    shot: shots.tickets.ticket,
  },
  {
    title: "Walk in at the gate",
    body: "Organizers scan from their own phone. A ticket that has already been used is turned away.",
    shot: shots.tickets.gate,
  },
];

/** Screens shown in each case study, by project slug. */
export const galleries: Record<string, Shot[]> = {
  "waona-identity": [shots.identity.signIn, shots.identity.register, shots.identity.handoff],
  "waona-tickets": [
    shots.tickets.discoverDesktop,
    shots.tickets.studio,
    shots.tickets.home,
    shots.tickets.reserve,
    shots.tickets.ticket,
    shots.tickets.gate,
  ],
};
