#include <iostream>
#include <vector>

using namespace std;

void sort(vector<int> &a, int n, int i)
{

    if (i > n)
        return;

    int j = i;

    while (j > 0 && a[j - 1] > a[j])
    {
        swap(a[j - 1], a[j]);
        j--;
    }

    sort(a, n, i + 1);
}

int main()
{
    vector<int> a = {13, 46, 24, 52, 20, 9};
    int n = a.size();

    sort(a, n - 1, 1);

    for (int i : a)
    {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}