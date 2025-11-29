package com.environment.util;

public class EmailTemplates {

    public static String issueCreated(String username, String title) {
        return "Hello " + username + ",\n\nYour issue \"" + title + "\" has been submitted successfully.\nWe will notify you when it is updated.\n\nRegards,\nEnvironmental Team";
    }

    public static String issueStatusChanged(String username, String title, String status) {
        return "Hello " + username + ",\n\nYour issue \"" + title + "\" status changed to: " + status + ".\n\nRegards,\nEnvironmental Team";
    }
}
