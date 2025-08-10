#include <iostream>

using namespace std;

int main()
{
    int N = 6;
    int arr[] = {13, 46, 24, 52, 20, 9};
    for (int i = N - 1; i > 0; i--)
    {
        bool flag = false;
        for (int j = 0; j < i; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                swap(arr[j], arr[j + 1]);
                flag = true;
            }
        }
        if (!flag)
        {
            break;
        }
    }
    for (int i = 0; i < N; i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}