package com.github.nkzawa.socketio.androidchat.controller;

import android.app.Application;

import com.github.nkzawa.socketio.androidchat.Constants;

import io.socket.client.IO;
import io.socket.client.Socket;

import java.net.URISyntaxException;
import java.security.NoSuchAlgorithmException;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;

public class ChatApplication extends Application {

    private Socket mSocket;
    {
        try {
            mSocket = IO.socket(Constants.CHAT_SERVER_URL);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    public Socket getSocket() {
        return mSocket;
    }
}
