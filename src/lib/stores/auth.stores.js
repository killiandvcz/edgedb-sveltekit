import {writable} from "svelte/store";
import {persist, createLocalStorage} from "@macfja/svelte-persistent-store";

export const isAuthenticated = persist(writable(false), createLocalStorage(), 'isAuthenticated');

export const user = persist(writable({}), createLocalStorage(), 'user');
