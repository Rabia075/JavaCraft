package Week_02;

import java.util.Scanner;

public class Task_06_SecureLogin {
     public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Enter username: ");
        String username = input.nextLine();

        System.out.print("Enter password: ");
        String password = input.nextLine();

        if (username.equals("admin") && password.equals("admin123")) 
        {
            System.out.println("Login Successful!");
        } 
        else 
        {
            System.out.println("Invalid Credentials. Please try again.");
        }

        input.close();
    }
}
