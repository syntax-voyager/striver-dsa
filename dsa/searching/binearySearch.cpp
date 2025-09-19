#include <iostream>
#include <vector>

using namespace std;

void search(vector<int> &arr, int target, int start, int end)
{
    int mid = start + (end - start) / 2;

    if (arr[mid] == target)
    {
        cout << mid << endl;
    }
    else if (arr[mid] > target)
    {
        search(arr, target, start, mid - 1);
    }
    else
    {
        search(arr, target, mid + 1, end);
    }
}

int main()
{
    vector<int> arr = {1, 2, 3, 4, 5, 6};
    int target = 5;
    int n = arr.size();

    search(arr, target, 0, n - 1);
    return 0;
}