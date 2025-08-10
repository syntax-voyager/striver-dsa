#include <iostream>
#include <vector>

using namespace std;

void merge(vector<int> &arr, int start, int mid, int end)
{
    vector<int> temp;
    int i = start, j = mid + 1;

    while (i <= mid && j <= end)
    {
        if (arr[i] <= arr[j])
        {
            temp.push_back(arr[i]);
            i++;
        }
        else
        {
            temp.push_back(arr[j]);
            j++;
        }
    }

    while (i <= mid)
    {
        temp.push_back(arr[i]);
        i++;
    }

    while (j <= end)
    {
        temp.push_back(arr[j]);
        j++;
    }

    for(int k = start; k <= end; k++){
        arr[k] = temp[k - start];
    }
}

void divide(vector<int> &arr, int start, int end)
{
    if (start >= end)
        return;

    int mid = start + (end - start) / 2;

    divide(arr, start, mid);

    divide(arr, mid + 1, end);

    merge(arr, start, mid, end);
}

int main()
{
    vector<int> arr = {7, 3, 2, 6, 0, 1, 5, 4};

    divide(arr, 0, arr.size() - 1);

    for (int n : arr)
    {
        cout << n << " ";
    }
    cout << endl;
}