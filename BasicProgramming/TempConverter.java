import java.util.Scanner;

public class TempConverter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Celsius: ");
        double celsius = sc.nextDouble();
        double fahrenheit = celsius * 9 / 5 + 32;
        System.out.println("Fahrenheit = " + fahrenheit);
        sc.close();
    }
}