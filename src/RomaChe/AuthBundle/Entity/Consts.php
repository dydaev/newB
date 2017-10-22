<?php
namespace RomaChe\AuthBundle\Entity;

class Consts
{
  const Permissions = array(
     0 => 'none',
     1 => 'execute_only',
     2 => 'write_only',
     3 => 'write_and_execute',
     4 => 'read_only',
     5 => 'read_and_execute',
     6 => 'read_and_write',
     7 => 'read_write_and_execute'
  );
}
