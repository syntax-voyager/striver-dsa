#include <iostream>
using namespace std;

void patternPrint(int n)
{
    for (int i = 1; i <= n; i++)
    {
        // spaces
        for (int j = n; j > i; j--)
        {
            cout << " ";
        }

        // letter
        char c1 = 'A';
        for (int j = 1; j <= i; j++)
        {
            cout << c1;
            c1++;
        }
        // second letter
        char c2 = 'A';
        for (int j = 1; j < i; j++)
        {
            cout << c2;
            c2++;
        }
        cout << endl;
    }
}

int main()
{
    patternPrint(5);
    return 0;
}