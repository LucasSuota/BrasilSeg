import { db } from "@/firebase";
import { Client, Load, LoadInputs } from "@/types/types";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

async function createClient(clientId: string, clientData: Client) {
  const clientRef = doc(db, "clients", clientId);
  await setDoc(clientRef, clientData);
}

async function addPayload(
  clientId: string,
  payloadCte: string,
  payloadData: Load
) {
  const payloadRef = doc(
    collection(db, "clients", clientId, "payloads"),
    payloadCte
  );
  await setDoc(payloadRef, payloadData);
}

async function getClient(clientId: string) {
  const clientRef = doc(db, "clients", clientId);
  const docSnap = await getDoc(clientRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

async function getPayloads(clientId: string) {
  const payloadsRef = collection(db, "clients", clientId, "payloads");
  const querySnapshot = await getDocs(payloadsRef);
  const payloads: Load[] = [];
  querySnapshot.forEach((doc) => {
    payloads.push(doc.data() as Load);
  });
  return payloads;
}

async function updateClient(clientId: string, updatedData: Load) {
  const clientRef = doc(db, "clients", clientId);
  await updateDoc(clientRef, updatedData);
}

async function updatePayload(
  clientId: string,
  payloadCte: string,
  updatedData: Load
) {
  const payloadRef = doc(db, "clients", clientId, "payloads", payloadCte);
  await updateDoc(payloadRef, updatedData);
}

async function deleteClient(clientId: string) {
  const clientRef = doc(db, "clients", clientId);
  await deleteDoc(clientRef);
}

async function deletePayload(clientId: string, payloadCte: string) {
  const payloadRef = doc(db, "clients", clientId, "payloads", payloadCte);
  await deleteDoc(payloadRef);
}

export {
  createClient,
  addPayload,
  getClient,
  getPayloads,
  updateClient,
  updatePayload,
  deleteClient,
  deletePayload,
};
