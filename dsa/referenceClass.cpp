#include <iostream>

using namespace std;

void passByReference(int &a, int &b, int &c)
{
    a = b + c;
    cout << a << endl;
}

void passByValue(int a, int b, int c)
{
    a = b + c;
    cout << a << endl;
}

int main()
{
    int a = 2;
    int b = 3;
    int c = 5;

    // passByReference(a, b, c);

    passByValue(a, b, c);

    cout << a << endl;

    return 0;
}