package Week_04;

import java.util.Scanner;

public class Task_16_AreaCalculator {

    public int calculateArea(int side) {
        return side * side;
    }
    public int calculateArea(int length, int width) {
        return length * width;
    }

    //Main method
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);
        Task_16_AreaCalculator calc = new Task_16_AreaCalculator();

        System.out.println("\n==== Area Calculator ====");
        System.out.println("\nChoose an option:");
        System.out.println("1. Find area of a Square");
        System.out.println("2. Find area of a Rectangle");
        System.out.print("\nEnter your choice (1 or 2): ");
        int choice = input.nextInt();

        if (choice == 1) {
            System.out.print("\nEnter the side of the square: ");
            int side = input.nextInt();
            int area = calc.calculateArea(side);
            System.out.println("Area of the Square = " + area);
        } 
        else if (choice == 2) {
            System.out.print("\nEnter the length of the rectangle: ");
            int length = input.nextInt();
            System.out.print("Enter the width of the rectangle: ");
            int width = input.nextInt();
            int area = calc.calculateArea(length, width);
            System.out.println("\nArea of the Rectangle = " + area);
        } 
        else {
            System.out.println("\nInvalid choice! Please run the program again and choose 1 or 2.");
        }

        input.close();
    }
}