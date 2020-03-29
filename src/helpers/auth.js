import { auth } from '../services/firebase';

const signUp = (email, password) =>
  auth().createUserWithEmailAndPassword(email, password);

const signIn = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

const signOut = () => auth().signOut();

export { signIn, signUp, signOut };