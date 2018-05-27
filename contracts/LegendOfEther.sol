pragma solidity ^0.4.20;

contract LegendOfEther { 
    
    struct Item {
        string name;
        string imageUrl;
        uint attackBonus;
        uint defenseBonus;
    }
    
    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }
    
    address public owner;
    Item[] public items;
    
    mapping(address => mapping(uint => uint)) public addressToItems;
    
    constructor() public {
        owner = msg.sender;
        items.push(Item(
            'Rusty Sword',
            '',
            10,
            0
        ));
        items.push(Item(
            'Rusty Shield',
            '',
            0,
            10
        ));
        createItem(0, 3);
        createItem(1, 3);
    }

    function getItemCount() public view returns(uint count) {
        return items.length;
    }
    
    function createItem(uint _itemId, uint _amount) public ownerOnly {
        addressToItems[0][_itemId] += _amount;
    }
    
    function transferItemOwnership(address _from, address _to, uint _itemId) external ownerOnly {
        removeItem(_from, _itemId);
        addItem(_to, _itemId);
    }
    
    function addItem(address _owner, uint _itemId) public ownerOnly {
        mapping(uint => uint) ownerItems = addressToItems[_owner];
        ownerItems[_itemId]++;
    }
    
    function removeItem(address _owner, uint _itemId) public ownerOnly {
        mapping(uint => uint) ownerItems = addressToItems[_owner];
        require(ownerItems[_itemId] > 0);
        ownerItems[_itemId]--;
    }
}
