declare global {
  interface User {
    id: string;
    name: string;
    email: string;
    address1?: string | null;
    address2?: string | null;
    picture?: string | null;
  }

  interface Client {
    userID: string;
    name: string;
    email: string;
    address1: string;
    address2: string;
  }

  interface Invoice {
    userID: string;
    userName: string;
    userEmail: string;
    userAddress1: string;
    userAddress2: string;
    clientID: string;
    clientName: string;
    clientEmail: string;
    clientAddress1: string;
    clientAddress2: string;
    paid: boolean;
  }
}
export {};
