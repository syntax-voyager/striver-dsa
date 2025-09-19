#include <iostream>

using namespace std;

class Complex
{
private:
    double real, imag;

public:
    Complex(double r = 0, double i = 0)
    {
        real = r;
        imag = i;
    }

    // Overloading the + operator
    Complex operator+(const Complex &obj)
    {
        Complex result;
        result.real = real + obj.real;
        result.imag = imag + obj.imag;
        return result;
    }

    void display()
    {
        cout << real << " + " << imag << "i" << endl;
    }
};

int main()
{
    Complex c1(3, 4), c2(5, 6), c3;
    c3 = c1 + c2; // c1.operator+(c2)
    c3.display(); // Output: 8 + 10i
    return 0;
}
