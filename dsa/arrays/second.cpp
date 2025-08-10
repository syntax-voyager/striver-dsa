#include <iostream>
#include <limits.h> // Required for INT_MIN and INT_MAX

using namespace std;

int secondLargestFn(int arr[], int n)
{
    // Handle arrays with less than 2 elements
    if (n < 2)
    {
        return -1; // Or handle as an error
    }
    int largest = INT_MIN;
    int secondLargest = INT_MIN;
    for (int i = 0; i < n; i++)
    {
        if (arr[i] > largest)
        {
            secondLargest = largest;
            largest = arr[i];
        }
        // Check if current element is between largest and secondLargest
        else if (arr[i] > secondLargest && arr[i] != largest)
        {
            secondLargest = arr[i];
        }
    }
    return secondLargest;
}

int secondSmallestFn(int arr[], int n)
{
    // Handle arrays with less than 2 elements
    if (n < 2)
    {
        return -1; // Or handle as an error
    }
    int smallest = INT_MAX;
    int secondSmallest = INT_MAX;
    for (int i = 0; i < n; i++)
    {
        if (arr[i] < smallest)
        {
            secondSmallest = smallest;
            smallest = arr[i];
        }
        // Check if current element is between smallest and secondSmallest
        else if (arr[i] < secondSmallest && arr[i] != smallest)
        {
            secondSmallest = arr[i];
        }
    }
    return secondSmallest;
}

int main()
{
    int arr[] = {10, 5, 8, 20, 12};
    int n = sizeof(arr) / sizeof(arr[0]);
    int secondLargest = secondLargestFn(arr, n);   // Should be 12
    int secondSmallest = secondSmallestFn(arr, n); // Should be 8
    cout << "Second Largest: " << secondLargest << endl;
    cout << "Second Smallest: " << secondSmallest << endl;
    return 0;
}