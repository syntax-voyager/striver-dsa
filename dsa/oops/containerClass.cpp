#include <iostream>

using namespace std;

class Stack
{
private:
    int *items;
    int capacity;
    int top;

public:
    Stack(int size)
    {
        items = new int[size];
        capacity = size;
        top = -1;
    }

    ~Stack(){
        delete[] items;
    }

    void push(int x)
    {
        if (top >= capacity - 1)
        {
            cout << "Stack Overflow" << endl;
            return;
        }
        items[++top] = x;
    }

    int pop()
    {
        if (top < 0)
        {
            cout << "Stack Underflow" << endl;
            return -1;
        }
        return items[top--];
    }
};

int main()
{
    Stack s(5);

    s.push(1);
    s.push(2);
    s.push(3);
    s.push(4);
    s.push(5);

    cout << s.pop() << endl;

    return 0;
}