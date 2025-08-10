#include <iostream>
#include <vector>

using namespace std;

void sort(vector<int> &a, int n)
{
    if (n == 1)
        return;

    bool didSwap = false;

    for (int i = 0; i < n - 1; i++)
    {
        if (a[i] > a[i + 1])
        {
            swap(a[i], a[i + 1]);
            didSwap = true;
        }
    }

    if (!didSwap)
        return;

    sort(a, n - 1);
}

int main()
{
    vector<int> a = {7, 3, 2, 1, 6, 5, 4};
    int n = a.size();

    sort(a, n);

    for (int i : a)
    {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}