# angular-rest-acl (bower repository)

This is the bower repo for angular-rest-acl for the Phalconphp REST API framework https://github.com/nerfe/phalconphp-rest-jwt-acl

## Bugs and issues

Please file any issues and bugs in our main repository at [https://github.com/nerfe/angular-rest-acl/issues]https://github.com/nerfe/angular-rest-acl/issues.

## Usage

This plugin assumes your are using this type of ACL format, which is the type of format my framework is using

```json
roles": {
    "admin": [
      "admin-create",
      "admin-edit",
      "admin-del",
      "admin-super"
    ],
    "sys": [
      "sys-user",
      "sys-roles",
      "sys-global"
    ]
}
```

#### Directive Usage

```html
<fieldset ng-rest-acl="['admin-create','admin-super']" aclpermission="opt" aclmode="disabled">
```

```aclmode``` can be set with ```disabled``` (disables element) or ```hide``` (hides element)
```aclpermission``` can be set with ```opt``` (one of the acl is enough to permit you from using the element) or ```all``` (you are required to have all the ACL to access the element)

#### Service / Resolve Usage
```javascript
//in controller
RestAcl.isOk(['usr-del', 'usr-rup', 'usr-aui','usr-rup'],'opt', 'hide');

//in state ui resolve
resolve: {
    roles: function(RestAcl){
	    return RestAcl.resolveRoles(['usr-del', 'usr-rup', 'usr-aui','usr-rup'],'opt');
    }
}
```

### bower installation

```bash
$ bower install angular-rest-acl
```

## License

Licensed under MIT.
