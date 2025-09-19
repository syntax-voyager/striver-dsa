#include <iostream>

using namespace std;

class Vector
{
private:
    int *data;
    int size;

public:
    // Constructor
    Vector(int s)
    {
        size = s;
        data = new int[size];
        for (int i = 0; i < size; i++)
        {
            data[i] = 0;
        }
    }

    // Copy constructor
    Vector(const Vector &source)
    {
        size = source.size;
        data = new int[size];
        for (int i = 0; i < size; i++)
        {
            data[i] = source.data[i];
        }
        cout << "Copy constructor called" << endl;
    }

    // Destructor
    ~Vector()
    {
        delete[] data;
    }

    void setValue(int index, int value)
    {
        if (index >= 0 && index < size)
        {
            data[index] = value;
        }
    }

    void display()
    {
        for (int i = 0; i < size; i++)
        {
            cout << data[i] << " ";
        }
        cout << endl;
    }
};

int main()
{
    Vector v1(3);
    v1.setValue(0, 10);
    v1.setValue(1, 20);
    v1.setValue(2, 30);

    Vector v2 = v1; // Copy constructor called

    v1.display(); // Output: 10 20 30
    v2.display(); // Output: 10 20 30

    return 0;
}