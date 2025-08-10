#include <iostream>
using namespace std;

void patternPrint(int n)
{
    for (int i = n; i >= 1; i--)
    {
        // spaces
        for (int j = (n - 1); j >= i; j--)
        {
            cout << " ";
        }

        // star
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