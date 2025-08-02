import java.util.Scanner;

public class LargestNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter 3 numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        int largest = a;
        if (b > largest) largest = b;
        if (c > largest) largest = c;
        System.out.println("Largest: " + largest);
        sc.close();
    }
}