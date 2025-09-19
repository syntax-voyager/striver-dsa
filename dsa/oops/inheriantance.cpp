#include <iostream>

using namespace std;

class Animal
{
public:
    void eat()
    {
        cout << "Eating..." << endl;
    }
};

// Single Inheritance
class Dog : public Animal
{
public:
    void bark()
    {
        cout << "Barking" << endl;
    }
};

// Multilevel Inheritance
class Bird : public Dog
{
public:
    void fly()
    {
        cout << "Flying" << endl;
    }
};

int main()
{
    Bird tom;
    return 0;
}