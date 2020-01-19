package com.meajax.controller;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

import com.meajax.model.*;

public class StartServer {
	public static final int port = 8899;
	private static void start() {
		ServerSocket ss;
		try {
			ss = new ServerSocket(StartServer.port);
			System.out.println("Server 启动成功, 正在监听本地8899端口!");
			
			while(true) {
				Socket s = ss.accept();
				Runnable r = new Query(s);
				Thread t = new Thread(r);
				t.start();
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {
		start();
	}
}
