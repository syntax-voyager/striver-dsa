#include <iostream>
using namespace std;

void patternPrint(int n)
{
    for (int i = 1; i <= n; i++)
    {
        if (i == 1 || i == n)
        {
            for (int j = 1; j <= n; j++)
            {
                cout << "*";
            }
        }
        else
        {
            // first-star
            cout << "*";
            // spaces
            for (int j = 1; j < n - 1; j++)
            {
                cout << " ";
            }
            // second-star
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