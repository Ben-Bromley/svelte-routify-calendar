import { writable } from "svelte/store";
import dayjs from 'dayjs';
export const events = writable([]);

export const timeframe = writable("month");
export const currentDate = writable(dayjs());

export const modal = writable(false);
export const eventModal = writable(true);
export const modalDate = writable(0);
export const APIEndPoint = writable('http://localhost:8080/')
