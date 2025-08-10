#include <iostream>
using namespace std;

void patternPrint(int n)
{
    // upper-half
    for (int i = 1; i <= n; i++)
    {
        // first-star
        for (int j = 1; j <= i; j++)
        {
            cout << "*";
        }
        // first-space
        for (int j = n; j > i; j--)
        {
            cout << " ";
        }
        // second-space
        for (int j = n; j > i; j--)
        {
            cout << " ";
        }
        // second-star
        for (int j = 1; j <= i; j++)
        {
            cout << "*";
        }
        cout << endl;
    }

    // lower-half
    for (int i = n; i >= 1; i--)
    {
        // first-star
        for (int j = 1; j <= i; j++)
        {
            cout << "*";
        }
        // first-space
        for (int j = n; j > i; j--)
        {
            cout << " ";
        }
        // second-space
        for (int j = n; j > i; j--)
        {
            cout << " ";
        }
        // second-star
        for (int j = 1; j <= i; j++)
        {
            cout << "*";
        }
        cout << endl;
    }
}

int main()
{
    patternPrint(5);
    return 0;
}