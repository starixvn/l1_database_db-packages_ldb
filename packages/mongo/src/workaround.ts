import { setDefaultAutoSelectFamily } from "net";

// This make `net` module behave like node v18
setDefaultAutoSelectFamily(false);
