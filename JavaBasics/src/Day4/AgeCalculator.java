package Day4;

import java.util.Scanner;

public class AgeCalculator {
    public static void main(String[] args)
    {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter your birth year: ");
        int birthYear = input.nextInt();
        int currentYear = 2025;
        int age = currentYear - birthYear;
        System.out.println("You are approximately " + age + " years old.");

        input.close();
    }
}
