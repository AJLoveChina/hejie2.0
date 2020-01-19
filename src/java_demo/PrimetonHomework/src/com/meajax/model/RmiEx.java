package com.meajax.model;

import java.rmi.*;

public interface RmiEx extends Remote{
	String welcome(String name) throws RemoteException;
}
