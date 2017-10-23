<?php
namespace RomaChe\AuthBundle\Entity;

class Consts
{
  const DEFAULT_AUTHOR_PERMISSION = 6;
  const DEFAULT_GROUP_PERMISSION = 6;
  const DEFAULT_GROUP_USER_PERMISSION = 4;
  const DEFAULT_OTHER_USERS_PERMISSION = 4;


  const READ = 4;
  const WRITE = 2;
  const EXECUTE = 1;
  
  const Permissions = array(
     0 => 'none',
     1 => 'execute_only',
     2 => 'write_only',
     3 => 'write_and_execute',
     4 => 'read_only',
     5 => 'read_and_execute',
     6 => 'read_and_write',
     7 => 'read_write_and_execute',
     'none' => 0,
     'execute_only' => 1,
     'write_only' => 2,
     'write_and_execute' => 3,
     'read_only' => 4,
     'read_and_execute' => 5,
     'read_and_write' => 6,
     'read_write_and_execute' => 7
  );
}
