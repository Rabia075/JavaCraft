package Week_02;

import java.util.Scanner;

public class Task_07_TrafficLight {
     public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Enter traffic light color (red, yellow, green): ");
        String color = input.nextLine();

        if (color.equals("red")) {
            System.out.println("Stop");
        } else if (color.equals("yellow")) {
            System.out.println("Slow Down");
        } else if (color.equals("green")) {
            System.out.println("Go");
        } else {
            System.out.println("Invalid color. Please enter red, yellow, or green.");
        }

        input.close();
    }
}
