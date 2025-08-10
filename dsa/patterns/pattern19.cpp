#include <iostream>
using namespace std;

void patterPrint(int n)
{
    // upper-half
    for (int i = 1; i <= n; i++)
    {
        // first-star
        for (int j = i; j <= n; j++)
        {
            cout << "*";
        }
        // space
        for (int j = 1; j < i; j++)
        {
            cout << " ";
        }
        // second-space
        for (int j = 1; j < i; j++)
        {
            cout << " ";
        }
        // second-start
        for (int j = i; j <= n; j++)
        {
            cout << "*";
        }
        cout << endl;
    }
    // lower-half
    for (int i = n; i >= 1; i--)
    {
        // first-star
        for (int j = i; j <= n; j++)
        {
            cout << "*";
        }
        // space
        for (int j = 1; j < i; j++)
        {
            cout << " ";
        }
        // second-space
        for (int j = 1; j < i; j++)
        {
            cout << " ";
        }
        // second-start
        for (int j = i; j <= n; j++)
        {
            cout << "*";
        }
        cout << endl;
    }
}

int main()
{
    patterPrint(5);
    return 0;
}