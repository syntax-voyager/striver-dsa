#include <iostream>

using namespace std;

class A
{
private:
    int privateData;

public:
    A()
    {
        privateData = 10;
    }

    friend class B;
};

class B
{
public:
    void getInto(A a)
    {
        cout << a.privateData << endl;
    }
};

int main()
{
    A a;
    B b;
    b.getInto(a);
    return 0;
}