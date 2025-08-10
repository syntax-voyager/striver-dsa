#include <iostream>
using namespace std;

void patternPrint(int n)
{
    for (int i = 1; i <= n; i++)
    {
        // Spaces
        for (int j = (n-1); j >= i; j--)
        {
            cout << " ";
        }

        // Star
        for (int j = 1; j <= (2 * i - 1); j++)
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