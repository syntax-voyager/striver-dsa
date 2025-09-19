#include <iostream>

using namespace std;

class Animal
{
public:
    virtual void makeSound()
    {
        cout << "Animal makes a sound" << endl;
    }
};

class Dog : public Animal
{
public:
    void makeSound() override
    {
        cout << "Barking" << endl;
    }
};

class Cat : public Animal
{
public:
    void makeSound() override
    {
        cout << "Meow" << endl;
    }
};

int main()
{
    Animal *animals[3];
    animals[0] = new Animal();
    animals[1] = new Dog();
    animals[2] = new Cat();

    for (int i = 0; i < 3; i++)
    {
        animals[i]->makeSound();
    }
    return 0;
}