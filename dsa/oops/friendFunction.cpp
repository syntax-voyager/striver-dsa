#include <iostream>

using namespace std;

class Box
{
private:
    double height, width;

public:
    Box(double h, double w)
    {
        height = h;
        width = w;
    }

    friend double area(Box b);
};

double area(Box b)
{
    return b.height * b.width;
}

int main()
{
    Box b(2, 5);

    cout << "Area: " << area(b) << endl;
    return 0;
}